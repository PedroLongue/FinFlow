import { createFileRoute } from "@tanstack/react-router";
import { configurations } from "../pages/Configurations";

export const Route = createFileRoute("/configurations")({
  component: configurations,
});
