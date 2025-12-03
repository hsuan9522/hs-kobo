import { NoteInfo } from "@/store/statistics.slice";
import jsPDF from "jspdf";
import { useState } from "react";
import '@/utils/jsPDFfont'

export default function useGeneratePdf({ title, author, notes }: { title: string, author: string, notes: NoteInfo[] }) {

    const generateContent = async () => {

        let date = ''
        const notesString = notes.reduce((acc, curr) => {
            console.log('curr', curr);
            if (date !== curr.date) {
                acc += `<h4 style="color: #888; margin: 30px 0 15px 0; font-size: 1em;">${curr.date}</h4>`
                date = curr.date
            }
            acc += `
            <div style="position: relative; padding-left: 25px; margin-bottom: 12px;">
                <span style="position: absolute; left: 0; color: #666; font-weight: bold;">•</span>
                ${curr.text}
            </div>
            `
            if (curr.annotation) {
                acc += `
                <div style="margin: 10px 0; padding: 20px 20px; padding-top: 8px; border-left: 4px solid #ddd; background: #f9f9f9; color: #555;">
                    ${curr.annotation}
                </div>
                `
            }
            return acc
        }, '')

        const htmlContent = `
            <div style="font-family:  NotoSansTC-Regular; width: 800px; padding: 30px; margin: 0;">
                <h3 style="margin-bottom: 20px; font-size: 18px;">《${title}》 ──&emsp;<small style="font-size: 16px; color: #666;">${author}</small></h3>
                <div style="font-size: 14px;">
                    ${notesString}
                </div>
            </div>
        `

        return htmlContent
    }

    const [downloadLoading, setDownloadLoading] = useState(false)
    const generatePDF = async (): Promise<Blob> => {
        setDownloadLoading(true)
        const htmlContent = await generateContent()

        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: 'a4',
            hotfixes: ['px_scaling'],
            precision: 3,
        })

        doc.addFont('NotoSansTC-Regular-normal.ttf', 'NotoSansTC-Regular', 'normal')
        doc.setFont('NotoSansTC-Regular')

        return new Promise((resolve) => {
            doc.html(htmlContent, {
                callback: (pdf) => {
                    const blob = pdf.output('blob')
                    resolve(blob)
                    setDownloadLoading(false)
                },
            })
        })
    }

    return {
        downloadLoading,
        generatePDF
    }

}