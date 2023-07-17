import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function waitTester(timeout: number = 1000) {
  await new Promise((resolve) => {
    console.log(`waiting ${timeout / 1000} sec...`)
    setTimeout(() => {
      console.log('Waiting finished!')
      return resolve(true)
    }, timeout);
  })
}

export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
})
