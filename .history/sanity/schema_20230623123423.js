export const schema = {
  types: [{
    name: 'urun',
    type: 'document',
      title: 'Ürünler',
    fields: [
      {
        name: 'name',
        type: 'string',
        title: 'İsim'
      },
      {
        name: 'foto',
        type: 'image',
      }
    ]
  },
],
}
