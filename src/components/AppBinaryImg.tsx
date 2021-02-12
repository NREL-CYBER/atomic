import { IonImg } from '@ionic/react';
import React, { memo } from 'react';
import { binaryToFileUri } from '../util';


interface itemProps {
    binary: string,
    alt: string,
    height?: string
    width?: string
}

/**
 */
const AppBinaryImg: React.FC<itemProps> = ({ width, height, alt, binary }) => {
    return <img alt={alt} height={height} width={width} src={binaryToFileUri(binary, "image")} />
};
export default memo(AppBinaryImg);