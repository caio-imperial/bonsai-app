import type { File as FormidableFile } from 'formidable'

export type UploadedFile = FormidableFile & { filepath: string }
