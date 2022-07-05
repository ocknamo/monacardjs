import { parseDescription } from './parse-description';

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
