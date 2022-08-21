type Colors = 'red' | 'green' | 'blue';

// template literal types can only use string type.
type ColorSelector<Keys extends string = Colors> = {
  [Key in Keys as `select${Capitalize<Key>}`]: number; // 0 - 255
}

function selectColor: ColorSelector = {
  selectRed: 69,
  selectGreen: 69,
  selectBlue: 69,
};

interface DataEntiry {
  id: string;
};

interface Movie extends DataEntiry {
  director: string;
};

interface Song extends DataEntiry {
  singer: string;
};

interface DataEntityMap {
  movie: Movie;
  song: Song;
};

// the type would be:
// {
//  getAllMovie: () => Movie[];
//  getAllSong: () => Song[];
//  getMovie: (id: string) => Movie;
//  getSong: (id: string) => Song;
// }
type DataStoreMethods = {
  [Key in keyof DataEntityMap as `getAll${Capitalize<Key>}`]: () => DataEntityMap[Key][];
} & {
  [Key in keyof DataEntityMap as `get${Capitalize<Key>}`]: (id: string) => DataEntityMap[Key];
};
