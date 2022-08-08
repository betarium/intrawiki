import { useLocation } from "react-router";

export default function useLocationQuery() {
  const { search } = useLocation()
  return new URLSearchParams(search)
}
