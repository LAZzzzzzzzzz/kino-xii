import { UploadIcon } from '../icons';

const AvatarUpload = ({ previewUrl, error, ...rest }) => {
  return (
    <div className="flex items-center gap-3">
      <label className="flex size-10 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-dashed border-raised bg-tint-white text-disabled transition-colors duration-150 ease-out hover:bg-white/20">
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Avatar preview"
            className="size-full object-cover"
          />
        )}
        {!previewUrl && <UploadIcon />}

        <input type="file" {...rest} className="hidden" />
      </label>

      <div className="flex flex-col gap-0.75">
        <p className="text-sm font-extrabold">Upload avatar (optional)</p>

        {error && <p className="text-xs leading-body text-red">{error}</p>}
        {!error && (
          <p className="text-xs leading-body text-secondary">
            JPG, PNG or WEBP
          </p>
        )}
      </div>
    </div>
  );
};

export default AvatarUpload;
