
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Function to simulate spinning wheel and landing on a prize
export function spinWheel(
  targetPrizeId: string,
  totalSegments: number,
  callback: (finalRotation: number) => void
) {
  // Calculate segment size in degrees
  const segmentSize = 360 / totalSegments;
  
  // Calculate the position of the target prize
  const targetIndex = parseInt(targetPrizeId.replace('prize', '')) - 1;
  const targetDegree = targetIndex * segmentSize;
  
  // Add random offset within the segment to make it look natural
  const offset = Math.random() * (segmentSize * 0.6) - (segmentSize * 0.3);
  
  // Calculate final rotation (4 full rotations + position to land on target)
  const finalRotation = 1440 + (360 - targetDegree - offset);
  
  // Return final rotation for animation
  callback(finalRotation);
}

// Function to generate confetti elements
export function generateConfetti(count: number) {
  const colors = ['#D12A22', '#E6A74E', '#3D2314', '#D4954E', '#6B4226'];
  return Array.from({ length: count }).map((_, i) => ({
    id: `confetti-${i}`,
    color: colors[Math.floor(Math.random() * colors.length)],
    left: `${Math.random() * 100}%`,
    size: `${5 + Math.random() * 10}px`,
    delay: i,
  }));
}

// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Parse CSV for voucher upload
export function parseCSV(csvText: string): any[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return headers.reduce((obj, header, i) => {
      obj[header] = values[i];
      return obj;
    }, {} as any);
  });
}

// Export data to CSV
export function exportToCSV(data: any[], filename: string): void {
  if (data.length === 0) {
    console.error('No data to export');
    return;
  }

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => headers.map(header => {
      // Handle special cases like dates and values with commas
      const value = row[header];
      if (value instanceof Date) {
        return formatDate(value);
      }
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      return value;
    }).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone number format (simple validation, can be expanded)
export function isValidPhone(phone: string): boolean {
  return phone.length >= 8 && /^\+?[0-9\s-]+$/.test(phone);
}
