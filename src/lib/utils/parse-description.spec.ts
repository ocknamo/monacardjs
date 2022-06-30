// import { Description } from '../index';

import { parseDescription } from './parse-description';

// export function parseDescription(text: string): Description | undefined {
//   let json: object | undefined = undefined;
//   try {
//     json = JSON.parse(text);
//   } catch (error) {
//     console.warn(`Source text is invalid. I cant parse to json. text: ${text}`);
//     return undefined;
//   }

//   if (!json || !json['monacard']) {
//     return undefined;
//   }

//   const desc = json['monacard'];

//   return {
//     identifier: 'monacard',
//     cardName: desc['name'] ?? '',
//     ownerName: desc['owner'] ?? '',
//     addDescription: desc['desc'] ?? '',
//     tag: desc['tag'] ?? '',
//     cid: desc['cid'] ?? '',
//     ver: desc['ver'] ?? '',
//   };
// }

describe('parseDescription', () => {
  it('should be parse description', () => {
    expect(
      parseDescription(
        `{"monacard":{"name": "MONACARD2.0","owner": "モナカード公式","desc": "このカードは新しい方式で登録されました。","tag": "公式,test,2.0","cid": "bafkrmibgvyv6gr4rgnscfffllralzdh3fcfsqoqawcmfnlu4heel3rwu4i","ver": "2"}}`,
      ),
    ).toEqual({
      identifier: 'monacard',
      cardName: 'MONACARD2.0',
      ownerName: 'モナカード公式',
      addDescription: 'このカードは新しい方式で登録されました。',
      tag: '公式,test,2.0',
      cid: 'bafkrmibgvyv6gr4rgnscfffllralzdh3fcfsqoqawcmfnlu4heel3rwu4i',
      ver: '2',
    });
  });

  it('should return undefined with not json text', () => {
    expect(parseDescription('not json text')).toBeUndefined();
  });

  it('should return undefined with not monacard description', () => {
    expect(parseDescription('{"monage":{"name":"uhouho"}}')).toBeUndefined();
  });
});
