import { Box, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { Next, PageNumber, Prev } from "./partials";
interface Props {
    count: number | null | undefined;
    pageSize: number;
    page: number;
    setPage: (page: number) => void;
}
const Pagination = ({ count, pageSize, page, setPage }: Props) => {
    const pages = count ? Math.ceil(count / pageSize) : 1;
    // Helper function to generate an array of page numbers
    const generatePageNumbers = () => {
        if (pages <= 7) {
            return Array.from({ length: pages }, (_, index) => index + 1);
        }
        const maxPagesToShow = 5; // Adjust this value as needed
        const pageNumbers = [];
        if (page <= maxPagesToShow - 2) {
            // If current page is close to the beginning
            for (let i = 1; i <= maxPagesToShow; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(pages);
        } else if (page >= pages - maxPagesToShow + 2) {
            // If current page is close to the end
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = pages - maxPagesToShow + 1; i <= pages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // If current page is somewhere in the middle, show a single ellipsis in the middle
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = page - 1; i <= page + 1; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(pages);
        }
        // Remove duplicate ellipsis if present
        if (
            pageNumbers[pageNumbers.length - 2] === "..." &&
            pageNumbers[pageNumbers.length - 3] === "..."
        ) {
            pageNumbers.pop();
        }
        return pageNumbers;
    };

    const pageNumbers = generatePageNumbers();

    if (pages <= 1) {
        return "";
    }

    return (
        <Box>
            <HStack justifyContent="space-between" p="14px" fontWeight="600">
                <Text>
                    عرض {1 + (page - 1) * pageSize}-
                    {page * pageSize > (count || 0) ? count : page * pageSize} من{" "}
                    {count?.toLocaleString()} نتيجة
                </Text>

                <HStack spacing="8px" justifyContent="flex-start">
                    <Next pages={pages} page={page} setPage={setPage} />
                    {pageNumbers.map((pageNumber, index) => (
                        <React.Fragment key={index}>
                            {pageNumber === "..." ? (
                                <Box color="black">...</Box>
                            ) : (
                                <PageNumber
                                    pageNumber={Number(pageNumber)}
                                    page={page}
                                    setPage={setPage}
                                    key={pageNumber}
                                />
                            )}
                        </React.Fragment>
                    ))}
                    <Prev pages={pages} page={page} setPage={setPage} />
                </HStack>
            </HStack>
        </Box>
    );
};
export default Pagination;
