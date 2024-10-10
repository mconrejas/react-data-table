export const formatNumberWithoutDecimals = (num: number): string => {
    const integerPart = Math.floor(num).toString();
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export const formatNumberWithDecimals = (num: number, decimalPlaces: number = 2): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        minimumFractionDigits: decimalPlaces,
        maximumFractionDigits: 9
    });

    return formatter.format(num);
}