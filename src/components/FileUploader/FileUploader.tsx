import { useCallback, useEffect, useRef, useState } from 'react';
import * as LR from '@uploadcare/blocks';
import { FileEntry } from '../../pages/Types';
import { OutputFileEntry } from "@uploadcare/blocks";

LR.registerBlocks(LR);

interface FileUploaderProps {
    fileEntry: FileEntry;
    onChange: (fileEntry: FileEntry) => void;
}

export default function FileUploader({ fileEntry, onChange }: FileUploaderProps) {
    const [uploadFiles, setUploadFiles] = useState<OutputFileEntry<'success'>[]>([]);
    const ctxProviderRef = useRef<InstanceType<LR.UploadCtxProvider>>(null);

    const handleRemoveClick = useCallback(
        (uuid: OutputFileEntry['uuid']) => onChange({ files: fileEntry.files.filter((f) => f.uuid !== uuid) }),
        [fileEntry.files, onChange],
    );


    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const handleChangeEvent = (e: LR.EventMap['change']) => {
            setUploadFiles([...e.detail.allEntries.filter(f => f.status === 'success')] as LR.OutputFileEntry<'success'>[]);
        };

        ctxProvider.addEventListener('change', handleChangeEvent);
        return () => {
            ctxProvider.removeEventListener('change', handleChangeEvent);
        };
    }, [setUploadFiles]);


    useEffect(() => {
        const ctxProvider = ctxProviderRef.current;
        if (!ctxProvider) return;

        const resetUploaderState = () => ctxProviderRef.current?.uploadCollection.clearAll();

        const handleModalCloseEvent = () => {
            resetUploaderState();

            onChange({ files: [...fileEntry.files, ...uploadFiles] })

            setUploadFiles([]);
        };

        ctxProvider.addEventListener('modal-close', handleModalCloseEvent);

        return () => {
            ctxProvider.removeEventListener('modal-close', handleModalCloseEvent);
        };
    }, [fileEntry, onChange, uploadFiles, setUploadFiles]);

    return (
        <>
            <lr-upload-ctx-provider
                ctx-name="my-uploader"
                ref={ctxProviderRef}>
            </lr-upload-ctx-provider>

            <div>
                {fileEntry.files.map((file) => (
                    <div key={file.uuid}>
                        <img
                            key={file.uuid}
                            src={`${file.cdnUrl}/-/format/webp/-/quality/smart/-/stretch/fill/`}
                            width="100%" />

                        <div className="cursor-pointer flex justify-center absolute bg-white border-2 border-slate-800  rounded-full w-7 h-7" style={{ top: '10px', right: '10px' }}>
                            <button
                                className="text-slate-800 text-center"
                                type="button"
                                onClick={() => handleRemoveClick(file.uuid)}>
                                ×
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}