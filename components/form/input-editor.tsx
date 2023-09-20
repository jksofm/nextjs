import React, {
  ChangeEvent,
  LegacyRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';
import { Box, FormHelperText, TextField, TextFieldProps, Typography } from '@mui/material';
import Image from 'next/image';
import img from '../../images/work/placehold.jpg';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

export type InputEditorProps<T extends FieldValues> = {
  name: Path<T>; ///Filted values là một kiễu dữ liệu object chứa key và value, value là kiểu any, key là string
  // Path<T> nghĩ là name sẽ là key của dữ liệu này

  control: Control<T>;
  label?: string;
};
// Khi minh set generic type cho inputfiled la T extend Filedvalues thì mình sẽ chắc chắn được rằng name truyền trong props sẽ là key của thằng field values
export function InputEditor<T extends FieldValues>({ name, label, control }: InputEditorProps<T>) {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  /// Khi ta dùng useRef tới React Quill thì nó chỉ tra về retry nên ta phải lấy được React Quill và forwardref vào cho nó
  interface ReactQuillWrapperProps extends ReactQuillProps {
    forwardedRef: LegacyRef<ReactQuill>;
  }
  const ReactQuillWrapper = useMemo(
    () =>
      dynamic(
        async () => {
          const { default: RQ } = await import('react-quill');

          const Component = ({ forwardedRef, ...props }: ReactQuillWrapperProps) => {
            return <RQ ref={forwardedRef} {...props} />;
          };
          return Component;
        },
        { ssr: false }
      ),
    []
  );

  /// Import reactquill vào form (module và format)
  const imageHandler = useCallback(() => {
    if (cloundinaryWidgetRef.current) {
      // @ts-ignore no type def support yet

      cloundinaryWidgetRef.current.open();
    }
  }, []);
  const editorRef = useRef(null);
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        [{ color: [] }, { background: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'background',
  ];
  /// Import cloundinary vào format bằng handleImage
  const cloundinaryWidgetRef = useRef(null);
  const cloudName = 'learn-next-js'; // replace with your own cloud name
  const uploadPreset = 'upload-image-editor';
  useEffect(() => {
    // @ts-ignore no type def support yet

    const initCloudinary = () => {
      // @ts-ignore no type def support yet
      if (!window.cloudinary) {
        setTimeout(() => {
          initCloudinary;
        }, 500);
      }
      // @ts-ignore no type def support yet

      const myWidget = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          // cropping: true, //add a cropping step
          // showAdvancedOptions: true,  //add advanced options (public_id and tag)
          // sources: [ "local", "url"], // restrict the upload sources to URL and local files
          multiple: false, //restrict upload to a single file
          // folder: "user_images", //upload files to the specified folder
          // tags: ["users", "profile"], //add the given tags to the uploaded files
          // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
          clientAllowedFormats: ['image'],
          maxImageFileSize: 2000000, //restrict file size to less than 2MB
          // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
          // theme: "purple", //change to a purple theme
        },
        // @ts-ignore no type def support yet

        (error, result) => {
          if (!error && result && result.event === 'success') {
            console.log('Done! Here is the image info: ', result.info);
            // document.getElementById('uploadedimage').setAttribute('src', result.info.secure_url);
            const quill = editorRef.current;
            // @ts-ignore no type def support yet

            const range = quill?.getEditorSelection();
            if (quill && range) {
              console.log(quill, range);
              // @ts-ignore no type def support yet

              quill.getEditor().insertEmbed(range.index, 'image', result.info.secure_url);
            }
          }
        }
      );
      cloundinaryWidgetRef.current = myWidget;
    };
    initCloudinary();
  }, []);

  return (
    <Box mt={2}>
      {/* <Typography
        sx={{
          marginTop: '20px',
        }}
        variant="body2"
      >
        {label}
      </Typography> */}
      <Box>
        <ReactQuillWrapper
          forwardedRef={editorRef}
          modules={modules}
          formats={formats}
          theme="snow"
          value={value}
          onChange={(content) => {
            onChange(content as any);
          }}
        />
      </Box>

      <FormHelperText error={!!error}> {error?.message}</FormHelperText>
    </Box>
  );
}

/// Flow cach dung của useForm :
// Component cha sẽ truyền vào form initial value, và một cái handleSubmit để xử lí submit.
/// Các form field sẽ nhận name và control từ useForm sau đó sử dụng useController để xử lí . Với mỗi name khác nhau thì Input field sẽ lấy ra control khác nhau và trả về các value khác nhau để render ra UI.
// Mỗi khi có event change thì  ta phải cấp giá trị mới cho Input ở hàm onChange.
/// Ref dùng để cung cấp error cho control.
