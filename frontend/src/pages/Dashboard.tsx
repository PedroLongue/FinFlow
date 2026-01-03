import { useAuth } from "../hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">
        Olá, {user?.name.split(" ")[0]}! 👋
      </h1>
      <p className="text-muted-foreground">
        Aqui está o resumo das suas finanças
      </p>
    </div>
  );
};
