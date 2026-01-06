'use client';

import {
  Document,
  Page,
  Text,
  View,
  PDFDownloadLink,
} from '@react-pdf/renderer';

import styles from './styles';

import type { ClientComponentProps } from '@types';
import type { ExportProps } from './types';

const PDFDocument = <T extends Record<string, any>>({
  data,
  headers,
}: ExportProps<T>) => (
  <Document>
    <Page size="A4" style={styles.page} orientation="landscape">
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          {headers.map((header, index) => (
            <Text
              key={index}
              style={[
                styles.tableCell,
                header.width ? { width: header.width, flex: undefined } : {},
              ]}
            >
              {header.label}
            </Text>
          ))}
        </View>
        {data.map((item, rowIndex) => (
          <View key={rowIndex} style={styles.tableRow}>
            {headers.map((header, cellIndex) => (
              <Text
                key={cellIndex}
                style={[
                  styles.tableCell,
                  header.width ? { width: header.width, flex: undefined } : {},
                ]}
              >
                {item[header.key]}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

const PdfLink: ClientComponentProps<ExportProps<Record<string, any>>> = ({
  data,
  headers,
  filename,
}) => {
  return (
    <PDFDownloadLink
      document={<PDFDocument data={data} headers={headers} />}
      fileName={`${filename}.pdf`}
      className="theme-bg-color flex h-10 w-full cursor-pointer items-center justify-center rounded-md text-xs font-semibold text-white transition duration-300 hover:shadow-lg"
      target="_blank"
    >
      <button>Export PDF</button>
    </PDFDownloadLink>
  );
};

export default PdfLink;
