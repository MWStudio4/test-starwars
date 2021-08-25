// used for sorting by age
export function birthToAge(birthStr: string): number {
    if (birthStr === 'unknown') {
        return 1000;
    }

    if (birthStr.includes('BBY')) {
        return -Number(birthStr.split('BBY')[0]);
    }

    if (birthStr.includes('ABY')) {
        return Number(birthStr.split('ABY')[0]);
    }

    return 1000;
}
