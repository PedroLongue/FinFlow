import {
  AlertCircle,
  Calendar,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  FileText,
  MoreVertical,
  PlusCircle,
  Sparkles,
} from "lucide-react";
import type { IBill } from "../../types/bills";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import type { BillsResponse } from "../../queries/bills";
import { useState } from "react";

interface IBillsList {
  bills: BillsResponse;
  isEmpty: boolean;
  dashpage?: boolean;
  onAddBill?: () => void;
  onBillClick?: (bill: IBill) => void;
  onPageChange?: (page: number) => void;
}

export const BillsList = ({
  bills,
  isEmpty,
  onAddBill,
  onBillClick,
  onPageChange,
  dashpage = false,
}: IBillsList) => {
  const [currentPage, setCurrentPage] = useState(bills.page || 1);
  const totalPages = bills.totalPages;

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setCurrentPage(newPage);
    onPageChange?.(newPage);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Hoje";
    if (diffDays === 1) return "Amanhã";
    if (diffDays === -1) return "Ontem";
    if (diffDays < 0) return `${Math.abs(diffDays)} dias atrás`;
    if (diffDays <= 7) return `Em ${diffDays} dias`;

    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PAID":
        return <Check className="w-4 h-4" />;
      case "OVERDUE":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "PAID":
        return "bg-success/20 text-success border-success/30";
      case "OVERDUE":
        return "bg-destructive/20 text-destructive border-destructive/30";
      default:
        return "bg-primary/20 text-primary border-primary/30";
    }
  };

  return (
    <Card variant="default">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            {dashpage ? "Próximos Boletos não pagos" : "Boletos"}
          </CardTitle>
          {!isEmpty && dashpage && (
            <Button variant="ghost" size="sm" className="text-primary">
              Ver todos →
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEmpty ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-primary/5 animate-pulse" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/10" />
              </div>

              <div className="relative w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-lg shadow-primary/20">
                <FileText className="w-7 h-7 text-primary-foreground" />
              </div>

              <div className="absolute -top-2 -right-3 w-6 h-6 rounded-lg bg-success/20 flex items-center justify-center animate-bounce-slow">
                <Sparkles className="w-3 h-3 text-success" />
              </div>
              <div className="absolute -bottom-1 -left-2 w-5 h-5 rounded-full bg-warning/20" />
            </div>

            <h3 className="text-lg font-semibold text-foreground mb-2">
              Nenhum boleto cadastrado
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs mb-6 leading-relaxed">
              Comece adicionando seus boletos para acompanhar vencimentos e
              nunca mais perca prazos.
            </p>

            <div className="w-full max-w-sm space-y-2 mb-6">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/20"
                  style={{ opacity: 1 - i * 0.25 }}
                >
                  <div className="w-10 h-10 rounded-lg bg-muted/40" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-24 rounded bg-muted/50" />
                    <div className="h-2 w-16 rounded bg-muted/30" />
                  </div>
                  <div className="h-4 w-16 rounded bg-muted/40" />
                </div>
              ))}
            </div>

            {onAddBill && (
              <Button onClick={onAddBill} size="sm" className="gap-2">
                <PlusCircle className="w-4 h-4" />
                Cadastrar primeiro boleto
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {bills.bills.map((bill, index) => (
                <div
                  key={bill.id}
                  onClick={() => onBillClick?.(bill)}
                  className={cn(
                    "group flex items-center gap-4 p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 cursor-pointer transition-all duration-200 animate-slide-up"
                  )}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border shrink-0",
                      getStatusStyles(bill.status)
                    )}
                  >
                    {getStatusIcon(bill.status)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {bill.title}
                      </h4>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="category">{bill.category}</Badge>
                      <span
                        className={cn(
                          "text-xs",
                          bill.status === "OVERDUE"
                            ? "text-destructive font-medium"
                            : "text-muted-foreground"
                        )}
                      >
                        {formatDate(bill.dueDate)}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 text-center px-4">
                    <span className="text-left text-sm text-muted-foreground line-clamp-1">
                      {bill.description || "Sem descrição"}
                    </span>
                  </div>

                  <div className="text-right shrink-0">
                    <span
                      className={cn(
                        "font-semibold",
                        bill.status === "PAID"
                          ? "text-success"
                          : bill.status === "OVERDUE"
                            ? "text-destructive"
                            : "text-foreground"
                      )}
                    >
                      {formatCurrency(bill.amount)}
                    </span>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Anterior
                </Button>

                <span className="text-sm text-muted-foreground">
                  Página {currentPage} de {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-2"
                >
                  Próxima
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};
