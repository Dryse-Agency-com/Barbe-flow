"use client";

import { Button } from "@/components/ui/Button";
import { BUSINESS } from "@/lib/data";

/** São Paulo is UTC-3 all year, so the offset can be applied directly. */
function toUtcStamp(dateISO: string, time: string, addMinutes = 0): string {
  const [year, month, day] = dateISO.split("-").map(Number);
  const [hour, minute] = time.split(":").map(Number);
  const utc = new Date(Date.UTC(year, month - 1, day, hour + 3, minute + addMinutes));
  return `${utc.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function ConfirmationActions({
  code,
  serviceName,
  barberName,
  date,
  time,
  durationMinutes,
}: {
  code: string;
  serviceName: string;
  barberName: string;
  date: string;
  time: string;
  durationMinutes: number;
}) {
  function downloadInvite() {
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//BarberFlow//Agendamento//PT-BR",
      "BEGIN:VEVENT",
      `UID:${code}@barberflow`,
      `DTSTAMP:${toUtcStamp(date, time)}`,
      `DTSTART:${toUtcStamp(date, time)}`,
      `DTEND:${toUtcStamp(date, time, durationMinutes)}`,
      `SUMMARY:${serviceName} na BarberFlow`,
      `DESCRIPTION:Profissional: ${barberName} — código ${code}`,
      `LOCATION:${BUSINESS.address}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ];

    const blob = new Blob([lines.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `barberflow-${code}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  const whatsappMessage = encodeURIComponent(
    `Olá! Confirmei um horário na BarberFlow — ${serviceName} com ${barberName}, dia ${date.split("-").reverse().join("/")} às ${time}. Código ${code}.`,
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button onClick={downloadInvite} size="lg" className="sm:flex-1">
        Adicionar ao calendário
      </Button>
      <Button
        href={`https://wa.me/${BUSINESS.phoneDigits}?text=${whatsappMessage}`}
        target="_blank"
        variant="secondary"
        size="lg"
        className="sm:flex-1"
      >
        Falar pelo WhatsApp
      </Button>
    </div>
  );
}
