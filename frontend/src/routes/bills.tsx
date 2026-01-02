import { createFileRoute } from "@tanstack/react-router";
import { Bills } from "../pages/Bills";

export const Route = createFileRoute("/bills")({
  component: Bills,
});
