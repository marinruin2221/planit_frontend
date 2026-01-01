import React from "react";
import { HStack, Button } from "@chakra-ui/react";

export default function PageForm({ currentPage, totalPages, onPageChange })
{
	const pageIndex = currentPage + 1; // 0 기반 -> 1 기반 표시

	const renderPageButtons = () =>
		Array.from({ length: totalPages }, (_, i) => i + 1).map(p => {
			const isActive = p === pageIndex;
			return (
				<Button
					key={p}
					variant={isActive ? "solid" : "outline"}
					size="sm"
					borderRadius="full"
					borderColor={isActive ? "var(--brand_color)" : "gray.300"}
					color={isActive ? "white" : "gray.700"}
					bg={isActive ? "var(--brand_color)" : "transparent"}
					_hover={{ bg: isActive ? "var(--brand_color)" : "gray.100" }}
					onClick={() => onPageChange(p - 1)}
				>
					{p}
				</Button>
			);
		});

	return <React.Fragment>
		<HStack justify="center">
			<Button
				variant="outline"
				size="sm"
				borderRadius="full"
				borderColor="gray.300"
				color="gray.700"
				isDisabled={pageIndex === 1}
				_hover={{ bg: "gray.100" }}
				onClick={() => onPageChange(currentPage - 1)}
			>
				이전
			</Button>

			{renderPageButtons()}

			<Button
				variant="outline"
				size="sm"
				borderRadius="full"
				borderColor="gray.300"
				color="gray.700"
				isDisabled={pageIndex === totalPages}
				_hover={{ bg: "gray.100" }}
				onClick={() => onPageChange(currentPage + 1)}
			>
				다음
			</Button>
		</HStack>
	</React.Fragment>
}