export const palletSchema = {
  $id: "pallete",
  title: "Pallete",
  type: "object",
  properties: {
    pallete: {
      type: "array",
      items: {
        $ref: "#/definitions/pallete_element"
      }
    }
  },
  definitions: {
    pallete_element: {
      $id: "#/definitions/pallete_element",
      type: "object",
      title: "Pallet Element",
      properties: {
        name: {
          title: "Pallete Color Name",
          description: "The name of a color",
          type: 'string'
        },
        a: {
          title: "O OR 1",
          type: "integer",
          minimum: 0,
          maximum: 1
        },
        r: {
          title: "red",
          type: "number",
          minimum: 0,
          maximum: 1
        },
        g: {
          title: "green",
          type: "number",
          minimum: 0,
          maximum: 1
        },
        b: {
          title: "blue",
          type: "number",
          minimum: 0,
          maximum: 1
        }
      },
      required: ['name', 'r', 'g', 'b']
    }
  }
};