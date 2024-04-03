import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as LR from '@uploadcare/blocks';
import blocksStyles from '@uploadcare/blocks/web/lr-file-uploader-regular.min.css?url';
import { FileEntry } from '../../pages/Types';

export interface IFileUploaderProps {
    fileEntry: FileEntry;
    onChange: (fileEntry: FileEntry) => void;
}

LR.registerBlocks(LR);

const FileUploader: React.FunctionComponent<IFileUploaderProps> = ({
    fileEntry,
    onChange,
}) => {

    const [uploadedFiles, setUploadedFiles] = useState<LR.OutputFileEntry[]>([]);
    const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null);

    const handleRemoveClick = useCallback(
        (uuid: LR.OutputFileEntry["uuid"]) =>
            onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
        [fileEntry.files, onChange]
    );

    useEffect(() => {
        const handleUploadEvent = (e: CustomEvent<OutputFileEntry[]>) => {
            if (e.detail) {
                console.log("The uploaded file event is ; ", e);
                setUploadedFiles([...e.detail]);
            }
        };
        ctxProviderRef.current?.addEventListener("data-output", handleUploadEvent);
        return () => {
            ctxProviderRef.current?.removeEventListener(
                "data-output",
                handleUploadEvent
            );
        };
    }, [setUploadedFiles]);

    useEffect(() => {
        const resetUploaderState = () =>
            ctxProviderRef.current?.uploadCollection.clearAll();

        const handleDoneFlow = () => {
            resetUploaderState();

            onChange({ files: [...uploadedFiles] });
            setUploadedFiles([]);
        };

        ctxProviderRef.current?.addEventListener("done-flow", handleDoneFlow);

        return () => {
            ctxProviderRef.current?.removeEventListener("done-flow", handleDoneFlow);
        };
    }, [fileEntry, onChange, uploadedFiles, setUploadedFiles]);

    console.log('test: ', fileEntry);

    return (
        <div>
            <lr-config
                ctx-name="my-uploader"
                pubkey="71ae8ebb306291f26f62"
                multiple={true}
                confirmUpload={false}
                removeCopyright={true}
                imgOnly={true}
            />
            <lr-file-uploader-regular
                ctx-name="my-uploader"
                css-src={blocksStyles}
            />
            <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}
            />

            <div className="grid grid-cols-2 gap-4 mt-8">
                {fileEntry.files.map((file) => (
                    <div key={file.uuid} className="relative">
                        <img
                            key={file.uuid}
                            src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/
              `}
                        />

                        <div className="cursor-pointer flex justify-center absolute -right-2 -top-2 bg-white border-2 border-slate-800  rounded-full w-7 h-7">
                            <button
                                className="text-slate-800 text-center"
                                type="button"
                                onClick={() => handleRemoveClick(file.uuid)}
                            >
                                x
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default FileUploader;