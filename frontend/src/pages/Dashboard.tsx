import { useState } from "react";
import { BillsList } from "../components/dashboard/BillsList";
import { HealthScoreCard } from "../components/dashboard/HealthScoreCard";
import { Loading } from "../components/ui/loading";
import { useAuth } from "../hooks/useAuth";
import { useBill } from "../hooks/useBills";
import type { BillsResponse } from "../queries/bills";

export const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const { user } = useAuth();
  const { bills, isLoading } = useBill(currentPage, "UNPAID");

  if (isLoading) {
    return <Loading />;
  }

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
      <BillsList
        dashpage
        bills={bills as BillsResponse}
        isEmpty={bills?.bills.length === 0}
        onPageChange={setCurrentPage}
        onAddBill={() => console.log()}
        onBillClick={() => console.log()}
      />
    </div>
  );
};
