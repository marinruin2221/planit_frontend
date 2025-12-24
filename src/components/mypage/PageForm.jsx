import React from "react";
import { HStack, Button } from "@chakra-ui/react";

export default function PageForm({ currentPage, totalPages, onPageChange })
{
	return <React.Fragment>
		<HStack justify="center">
			<Button
				variant="outline"
				size="sm"
				borderRadius="full"
				borderColor="gray.300"
				color="gray.700"
				isDisabled={currentPage === 1}
				_hover={{ bg: "gray.100" }}
				onClick={() => onPageChange(currentPage - 1)}
			>
				이전
			</Button>

			{Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
				const isActive = p === currentPage;
				return (
					<Button
						key={p}
						variant={isActive ? "solid" : "outline"}
						size="sm"
						borderColor={isActive ? "var(--brand_color)" : "gray.300"}
						borderRadius="full"
						color={isActive ? "white" : "gray.700"}
						bg={isActive ? "var(--brand_color)" : "transparent"}
						_hover={{ bg: isActive ? "var(--brand_color)" : "gray.100" }}
						onClick={() => onPageChange(p)}
					>
						{p}
					</Button>
				);
			})}

			<Button
				variant="outline"
				size="sm"
				borderRadius="full"
				borderColor="gray.300"
				color="gray.700"
				isDisabled={currentPage === totalPages}
				_hover={{ bg: "gray.100" }}
				onClick={() => onPageChange(currentPage + 1)}
			>
				다음
			</Button>
		</HStack>
	</React.Fragment>
}