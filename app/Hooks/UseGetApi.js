export default async function fetchData(endPoint) {
  let data = [];
  let error = null;
  let loading = true;

  try {
    const response = await fetch(
      "https://ecommerce.routemisr.com/api/v1/" + endPoint,
      {
        next: { revalidate: 300 },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    data = result.data;
  } catch (err) {
    console.error("Error fetching data:", err);
    error = err.message;
  } finally {
    loading = false;
  }

  return { data, error, loading };
}
