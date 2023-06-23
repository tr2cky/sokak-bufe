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
        name: 'desc',
        type: 'string',
        title: 'Açıklama'
      },
      {
        name: 'foto',
        type: 'image',
        title: 'Fotoğraf'
      },
      {
        name: 'fiyat',
        type: 'number',
        title: 'Fiyat'
      }
    ]
  },
],
}