export const get_clean_date = (date: string) : string => {
    const split_date = date.split("-");
    const inverse_date = `${split_date[2]}/${split_date[1]}/${split_date[0]}`;
    return inverse_date;
}