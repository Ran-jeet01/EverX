import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, AlignmentType, WidthType, BorderStyle } from "docx";
import { saveAs } from "file-saver";

export const generateStatsReport = async (data: any) => {
    if (!data) return;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const doc = new Document({
        sections: [
            {
                properties: {},
                children: [
                    new Paragraph({
                        text: "EverX Business Intelligence Report",
                        heading: HeadingLevel.HEADING_1,
                        alignment: AlignmentType.CENTER,
                        spacing: { after: 400 },
                    }),

                    new Paragraph({
                        children: [
                            new TextRun({ text: `Date Generated: ${new Date().toLocaleDateString()}`, italics: true }),
                        ],
                        alignment: AlignmentType.RIGHT,
                        spacing: { after: 400 },
                    }),

                    new Paragraph({
                        text: "Executive Summary",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 400, after: 200 },
                    }),

                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Metric")], shading: { fill: "f3f4f6" } }),
                                    new TableCell({ children: [new Paragraph("Value")], shading: { fill: "f3f4f6" } }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Total Users")] }),
                                    new TableCell({ children: [new Paragraph(data.totalUsers?.toLocaleString() || "0")] }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Total Products")] }),
                                    new TableCell({ children: [new Paragraph(data.totalProducts?.toLocaleString() || "0")] }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Total Revenue")] }),
                                    new TableCell({ children: [new Paragraph(`$${data.revenue?.toLocaleString() || "0"}`)] }),
                                ],
                            }),
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Total Orders")] }),
                                    new TableCell({ children: [new Paragraph(data.totalOrderedProduct?.toLocaleString() || "0")] }),
                                ],
                            }),
                        ],
                    }),

                    new Paragraph({
                        text: "Monthly Performance",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 600, after: 200 },
                    }),

                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Month")], shading: { fill: "f3f4f6" } }),
                                    new TableCell({ children: [new Paragraph("Orders")], shading: { fill: "f3f4f6" } }),
                                    new TableCell({ children: [new Paragraph("Revenue")], shading: { fill: "f3f4f6" } }),
                                ],
                            }),
                            ...months.map((month, index) => (
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(month)] }),
                                        new TableCell({ children: [new Paragraph((data.salesByMonth?.[index] || 0).toString())] }),
                                        new TableCell({ children: [new Paragraph(`$${(data.monthlyRevenue?.[index] || 0).toLocaleString()}`)] }),
                                    ],
                                })
                            ))
                        ],
                    }),

                    new Paragraph({
                        text: "Sales by Category",
                        heading: HeadingLevel.HEADING_2,
                        spacing: { before: 600, after: 200 },
                    }),

                    new Table({
                        width: { size: 100, type: WidthType.PERCENTAGE },
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({ children: [new Paragraph("Category")], shading: { fill: "f3f4f6" } }),
                                    new TableCell({ children: [new Paragraph("Total Sales")], shading: { fill: "f3f4f6" } }),
                                ],
                            }),
                            ...(data.salesByCategory || []).map((cat: any) => (
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph(cat.category || "Uncategorized")] }),
                                        new TableCell({ children: [new Paragraph(cat.sales?.toString() || "0")] }),
                                    ],
                                })
                            )),
                            ...(data.salesByCategory?.length === 0 ? [
                                new TableRow({
                                    children: [
                                        new TableCell({ children: [new Paragraph("No category data available")], columnSpan: 2 }),
                                    ],
                                })
                            ] : [])
                        ],
                    }),
                ],
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `EverX_Sustainability_Report_${new Date().toISOString().split('T')[0]}.docx`);
};
