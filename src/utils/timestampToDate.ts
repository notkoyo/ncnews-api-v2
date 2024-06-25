const timestampToDate = (created_at: number) => {
  if (!created_at || typeof created_at !== "number")
    throw new Error("Invalid timestamp or timestamp not provided.");
  else return new Date(created_at);
};

export default timestampToDate;