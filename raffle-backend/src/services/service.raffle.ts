import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getRaffles = async () => {
  try {
    return   await prisma.raffle.findMany({
      include: { entries: true },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const getRaffleById = async (id: number) => {
  try {
    return await prisma.raffle.findUnique({
      where: { id },
      include: { entries: true },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

type RaffleCreteData = Prisma.Args<typeof prisma.raffle, 'create'>['data'];
export const createRaffle = async (data: RaffleCreteData) => {
  try {
    return await prisma.raffle.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};  

type RaffleUpdateData = Prisma.Args<typeof prisma.raffle, 'update'>['data'];
export const updateRaffle = async (id: number, data: RaffleUpdateData) => {
  try {
    return await prisma.raffle.update({
      where: { id },
      data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const deleteRaffle = async (id: number) => {
  try {
    return await prisma.raffle.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};
type EntryCreteData = Prisma.Args<typeof prisma.entry, 'create'>['data'];
export const entryBuyNumber = async (data:EntryCreteData) =>{

  try {
    return await prisma.entry.create({
      data,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
} 