export const load = async ({ url }: { url: URL }) => {
  return {
    error: url.searchParams.get('reason') || null,
    success: url.searchParams.get('success') || null
  }
}
