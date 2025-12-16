// React
import React , { useState } from "react";

// chakra UI
import { Popover , Portal , Box , Flex , Text , Button , IconButton , Icon } from "@chakra-ui/react"
import { LuSearch , LuCalendarArrowUp , LuCalendarArrowDown , LuUser , LuPlus , LuMinus } from "react-icons/lu";

// Day Picker
import { DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import "react-day-picker/style.css";

export default function SearchForm()
{
	const [dateF,setDateF] = useState(date_format(new Date,"ymd"));
	const [dateT,setDateT] = useState(date_format(new Date,"ymd"));
	const [adult,setAdult] = useState(0);
	const [child,setChild] = useState(0);

	function date_format(date,type)
	{
		const yy = date.getFullYear();
		const mm = String(date.getMonth() + 1).padStart(2,"0");
		const dd = String(date.getDate()).padStart(2,"0");
		
		if(type == ".")
		{
			return yy + "." + mm + "." + dd;
		}
		if(type == "-")
		{
			return yy + "-" + mm + "-" + dd;
		}
		if(type == "/")
		{
			return yy + "/" + mm + "/" + dd;
		}
		if(type == "ymd")
		{
			return yy + "년 " + mm + "월 " + dd + "일";
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
		<Flex gap="4">
			<Popover.Root positioning={{placement:"top-start"}}>
				<Popover.Trigger asChild>
					<Flex align="center" flex="6" gap="2" p="4" rounded="sm" fontSize="sm" color="#9E9E9E" bg="#F5F5F5" cursor="pointer" _hover={{bg:"#EBEBEB"}} truncate>
						<Icon size="sm" as={LuSearch}/>
						<Text truncate>여행지, 숙소 검색</Text>
					</Flex>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Flex p="4">
								검색 TO-DO
							</Flex>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root positioning={{placement:"top-start"}}>
				<Popover.Trigger asChild>
					<Flex align="center" flex="2" gap="2" p="4" rounded="sm" fontSize="sm" color="#9E9E9E" bg="#F5F5F5" cursor="pointer" _hover={{bg:"#EBEBEB"}} truncate>
						<Icon size="sm" as={LuCalendarArrowUp}/>
						<Text truncate>{dateF}</Text>
					</Flex>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Flex p="4">
								<DayPicker mode="single" locale={ko} disabled={{before:new Date()}} onSelect={(date)=>{ setDateF(date_format(date,"ymd")); }}/>
							</Flex>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root positioning={{placement:"top-start"}}>
				<Popover.Trigger asChild>
					<Flex align="center" flex="2" gap="2" p="4" rounded="sm" fontSize="sm" color="#9E9E9E" bg="#F5F5F5" cursor="pointer" _hover={{bg:"#EBEBEB"}} truncate>
						<Icon size="sm" as={LuCalendarArrowDown}/>
						<Text truncate>{dateT}</Text>
					</Flex>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Flex p="4">
								<DayPicker mode="single" locale={ko} disabled={{before:new Date()}} onSelect={(date)=>{ setDateT(date_format(date,"ymd")); }}/>
							</Flex>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Popover.Root positioning={{placement:"top-start"}}>
				<Popover.Trigger asChild>
					<Flex align="center" flex="2" gap="2" p="4" rounded="sm" fontSize="sm" color="#9E9E9E" bg="#F5F5F5" cursor="pointer" _hover={{bg:"#EBEBEB"}} truncate>
						<Icon size="sm" as={LuUser}/>
						<Text truncate>인원 {adult + child}명</Text>
					</Flex>
				</Popover.Trigger>
				<Portal>
					<Popover.Positioner>
						<Popover.Content>
							<Flex direction="column" gap="4" p="4">
								<Flex justify="space-between" align="center">
									<Box>
										<Text>성인</Text>
										<Text fontSize="xs" color="#9E9E9E">만 18세 이상</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" onClick={()=>{ guest_update("adult",-1); }}><Icon size="sm" as={LuMinus}/></IconButton>
										<Button variant="plain">{adult}</Button>
										<IconButton variant="outline" onClick={()=>{ guest_update("adult",+1); }}><Icon size="sm" as={LuPlus}/></IconButton>
									</Flex>
								</Flex>
								<Flex justify="space-between" align="center">
									<Box>
										<Text>어린이</Text>
										<Text fontSize="xs" color="#9E9E9E">만 17세 이하</Text>
									</Box>
									<Flex>
										<IconButton variant="outline" onClick={()=>{ guest_update("child",-1); }}><Icon size="sm" as={LuMinus}/></IconButton>
										<Button variant="plain">{child}</Button>
										<IconButton variant="outline" onClick={()=>{ guest_update("child",+1); }}><Icon size="sm" as={LuPlus}/></IconButton>
									</Flex>
								</Flex>
							</Flex>
						</Popover.Content>
					</Popover.Positioner>
				</Portal>
			</Popover.Root>
			<Button flex="2" w="auto" h="auto" p="4" border="none" color="#FFFFFF" bg="#DD6B20" _hover={{bg:"#C05621"}}>검색하기</Button>
		</Flex>
	</React.Fragment>
}