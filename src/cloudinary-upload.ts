import cloudinary, {
  UploadApiErrorResponse,
  UploadApiResponse,
} from "cloudinary";

export function uploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      { public_id, overwrite, invalidate, resource_type: "auto" },
      (
        error: UploadApiErrorResponse | undefined,
        ressult: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(ressult);
      }
    );
  });
}

export function videoUploads(
  file: string,
  public_id?: string,
  overwrite?: boolean,
  invalidate?: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file,
      {
        public_id,
        overwrite,
        invalidate,
        chunk_size: 50000,
        resource_type: "video",
      },
      (
        error: UploadApiErrorResponse | undefined,
        ressult: UploadApiResponse | undefined
      ) => {
        if (error) resolve(error);
        resolve(ressult);
      }
    );
  });
}
