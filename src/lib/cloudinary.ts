const CLOUD_NAME = 'apelvikstrand';
const BASE = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: number | 'auto';
  format?: string;
}

export function cloudinaryUrl(publicId: string, opts: CloudinaryOptions = {}): string {
  const transforms: string[] = [];
  if (opts.width) transforms.push(`w_${String(opts.width)}`);
  if (opts.height) transforms.push(`h_${String(opts.height)}`);
  transforms.push(`q_${String(opts.quality ?? 'auto')}`);
  transforms.push(`f_${opts.format ?? 'auto'}`);
  transforms.push('c_fill');
  return `${BASE}/${transforms.join(',')}/${publicId}`;
}
