const getSections = async () => {
  const response = await fetch("/api/question");
  const data = await response.json();
  return data;
};

export default getSections;
