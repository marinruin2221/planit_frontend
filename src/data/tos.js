const tosFiles = import.meta.glob('./tos/*.txt', {
  eager: true,
  query: '?raw',
  import: 'default',
});

const tosContentMap = {};

for (const path in tosFiles) {
  // path 예시: "./tos/hello.txt"
  const fileName = path.split('/').pop().replace('.txt', '');
  tosContentMap[fileName] = tosFiles[path];
}

export const getTosContent = (name) => {
  if (tosContentMap[name]) {
    return tosContentMap[name];
  }
  return "약관 내용을 불러오는데 실패했습니다.";
};