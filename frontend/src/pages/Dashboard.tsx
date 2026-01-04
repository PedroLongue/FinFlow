import { HealthScoreCard } from "../components/dashboard/HealthScoreCard";
import { useAuth } from "../hooks/useAuth";

export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-4 lg:p-6 space-y-6 pb-24 lg:pb-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Olá, {user?.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-muted-foreground">
          Aqui está o resumo das suas finanças
        </p>
      </div>
      <HealthScoreCard
        score={70}
        isEmpty={false}
        onAction={() => console.log()}
      />
    </div>
  );
};
