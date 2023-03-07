export enum Mode {
  POMODORO="Pomodoro",
  SHORTBREAK="ShortBreak",
  LONGBREAK="LongBreak"
}

export enum Time {
  POMODORO= 25 * 60 ,
  SHORTBREAK=5 * 60,
  LONGBREAK= 15 * 60
}

export enum NotificationType {
  WARNING,
  SUCCESS,
  ERROR,
}
