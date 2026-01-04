import { PlusCircle, Sparkles } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { HealthScoreChart } from "../../assets/HealthScoreChart";

interface IHealthScoreCard {
  score: number;
  isEmpty?: boolean;
  onAction?: () => void;
}

export const HealthScoreCard = ({
  score,
  isEmpty,
  onAction,
}: IHealthScoreCard) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excelente";
    if (score >= 60) return "Bom";
    if (score >= 40) return "Regular";
    return "Atenção";
  };

  return (
    <Card variant="gradient" className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-6">
          <div className="relative w-32 h-32">
            <HealthScoreChart
              score={isEmpty ? 0 : score}
              isEmpty={isEmpty}
              showGradient={!isEmpty}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span
                className={`text-3xl font-bold ${isEmpty ? "text-muted-foreground/50" : getScoreColor(score)}`}
              >
                {isEmpty ? "--" : score}
              </span>
              <span
                className={`text-xs ${isEmpty ? "text-muted-foreground/50" : "text-muted-foreground"}`}
              >
                de 100
              </span>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">
                Saúde Financeira
              </h3>
            </div>

            {isEmpty ? (
              <>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  Cadastre seus boletos para calcularmos seu score de saúde
                  financeira baseado no seu histórico.
                </p>
                {onAction && (
                  <Button
                    onClick={onAction}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Começar agora
                  </Button>
                )}
              </>
            ) : (
              <>
                <p
                  className={`text-2xl font-bold ${getScoreColor(score)} mb-3`}
                >
                  {getScoreLabel(score)}
                </p>
                {onAction && (
                  <Button
                    onClick={onAction}
                    size="sm"
                    variant="outline"
                    className="gap-2"
                  >
                    <PlusCircle className="w-4 h-4" />
                    Ver detalhes
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
