export function getCurrentDate(): string {
    const date = new Date();
  
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    };
  
    return date.toLocaleString('en-US', options);
  }
  
 