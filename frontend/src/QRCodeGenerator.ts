import QRCode from "qrcode";

export async function generateQRCode(link: string) {
      return await QRCode.toDataURL(link);
}
