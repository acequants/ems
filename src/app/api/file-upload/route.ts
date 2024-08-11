import { renameFile } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { pipeline } from 'stream';
import { promisify } from 'util';

import fs from 'fs';

const pump = promisify(pipeline);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file: any = formData.getAll('files')[0];
    const fileName = renameFile(file.name);

    await pump(
      file.stream(),
      fs.createWriteStream(`./public/uploads/${fileName}`)
    );
    return NextResponse.json({ status: 'success', data: fileName });
  } catch (exception) {
    return NextResponse.json({ status: 'Failed', data: exception });
  }
}
