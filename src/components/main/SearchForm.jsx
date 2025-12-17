// React
import React , { useState } from "react";

// Chakra UI
import { Popover , Portal , Box , Flex , Stack , Text , Input , Button , IconButton , Icon } from "@chakra-ui/react";
import { LuSearch , LuCalendarArrowUp , LuCalendarArrowDown , LuUser , LuPlus , LuMinus } from "react-icons/lu";

// Day Picker
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

export default function SearchForm()
{
	const [dateF,setDateF] = useState(mmdd_format(new Date(),"k"));
	const [dateT,setDateT] = useState(mmdd_format(new Date(),"k"));
	const [adult,setAdult] = useState(0);
	const [child,setChild] = useState(0);

	function mmdd_format(date,type)
	{
		const mm = String(date.getMonth() + 1).padStart(2,"0");
		const dd = String(date.getDate()).padStart(2,"0");
		
		if(type == ".")
		{
			return mm + "." + dd;
		}
		if(type == "-")
		{
			return mm + "-" + dd;
		}
		if(type == "/")
		{
			return mm + "/" + dd;
		}
		if(type == "k")
		{
			return mm + "월 " + dd + "일";
		}
	}

	function guest_update(type,nums)
	{
		if(type == "adult")
		{
			if(adult + nums < 0) return;

			setAdult(adult + nums);
		}
		if(type == "child")
		{
			if(child + nums < 0) return;

			setChild(child + nums);
		}
	}
	
	return <React.Fragment>
		<Flex>
			1
		</Flex>

		{/* <Flex direction={{base:"column",md:"row"}} gap={{base:"3",md:"4"}}>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button variant="subtle" size="xl" w="auto" h="auto" p={{base:"3",md:"4"}} flex="auto" justifyContent="normal" alignItems="normal" color="gray.400" truncate>
						<Icon as={LuSearch}/>
						<Text truncate>여행지, 숙소 검색</Text>
					</Button>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Box p={{base:"3",md:"4"}}>
								<Input/>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button variant="subtle" size="xl" w="auto" h="auto" p={{base:"3",md:"4"}} flex="1" justifyContent="normal" alignItems="normal" color="gray.400" truncate>
						<Icon as={LuCalendarArrowUp}/>
						<Text truncate>{dateF}</Text>
					</Button>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content w="auto" h="auto">
							<Box p={{base:"3",md:"4"}}>
								<DayPicker mode="single" locale={ko} disabled={{before:new Date()}} onSelect={(date)=>{ setDateF(mmdd_format(date,"ymd")); }}/>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button variant="subtle" size="xl" w="auto" h="auto" p={{base:"3",md:"4"}} flex="1" justifyContent="normal" alignItems="normal" color="gray.400" truncate>
						<Icon as={LuCalendarArrowDown}/>
						<Text truncate>{dateT}</Text>
					</Button>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content w="auto" h="auto">
							<Box p={{base:"3",md:"4"}}>
								<DayPicker mode="single" locale={ko} disabled={{before:new Date()}} onSelect={(date)=>{ setDateT(mmdd_format(date,"ymd")); }}/>
							</Box>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root>
				<Popover.Trigger asChild>
					<Button variant="subtle" size="xl" w="auto" h="auto" p={{base:"3",md:"4"}} flex="1" justifyContent="normal" alignItems="normal" color="gray.400" truncate>
						<Icon as={LuUser}/>
						<Text truncate>성인 {adult}명, 어린이 {child}명</Text>
					</Button>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Stack p={{base:"3",md:"4"}} gap={{base:"3",md:"4"}}>
								<Flex justify="space-between" align="normal">
									<Box>
										<Text fontSize="md" fontWeight="bold" color="var(--brand_color)">성인</Text>
										<Text fontSize="sm" color="gray.400">만 18세 이상</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" size="md" onClick={()=>{ guest_update("adult",-1); }}><Icon as={LuMinus}/></IconButton>
										<IconButton variant="plain" size="md">{adult}</IconButton>
										<IconButton variant="outline" size="md" onClick={()=>{ guest_update("adult",+1); }}><Icon as={LuPlus}/></IconButton>
									</Flex>
								</Flex>
								<Flex justify="space-between" align="normal">
									<Box>
										<Text fontSize="md" fontWeight="bold" color="var(--brand_color)">어린이</Text>
										<Text fontSize="sm" color="gray.400">만 17세 이하</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" size="md" onClick={()=>{ guest_update("child",-1); }}><Icon as={LuMinus}/></IconButton>
										<IconButton variant="plain" size="md">{child}</IconButton>
										<IconButton variant="outline" size="md" onClick={()=>{ guest_update("child",+1); }}><Icon as={LuPlus}/></IconButton>
									</Flex>
								</Flex>
							</Stack>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Button variant="subtle" size="xl" w="auto" h="auto" p={{base:"3",md:"4"}} flex="1" color="var(--white_color)" bg="var(--brand_color)" _hover={{bg:"var(--brand_hover_color)"}}>검색하기</Button>
		</Flex> */}
	</React.Fragment>
}