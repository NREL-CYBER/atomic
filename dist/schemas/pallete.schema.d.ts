export declare const palletSchema: {
    $id: string;
    title: string;
    type: string;
    properties: {
        pallete: {
            type: string;
            items: {
                $ref: string;
            };
        };
    };
    definitions: {
        pallete_element: {
            $id: string;
            type: string;
            title: string;
            properties: {
                name: {
                    title: string;
                    description: string;
                    type: string;
                };
                a: {
                    title: string;
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                r: {
                    title: string;
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                g: {
                    title: string;
                    type: string;
                    minimum: number;
                    maximum: number;
                };
                b: {
                    title: string;
                    type: string;
                    minimum: number;
                    maximum: number;
                };
            };
            required: string[];
        };
    };
};
