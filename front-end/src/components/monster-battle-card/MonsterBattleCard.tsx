import { Box } from "@mui/material"
import { Monster } from "../../models/interfaces/monster.interface"
import { BattleMonsterCard, BattleMonsterTitle, Image, MonsterName, SectionDivider, ProgressLabel, ProgressBar } from "./MonsterBattleCard.styled"

type MonsterCardProps = {
    monster?: Monster | null
    title?: string
}

type PropertyItemProps = {
    value: any
    label: string
}

const PropertyItem: React.FC<PropertyItemProps> = ({ value, label }) => {
    return (
        <Box>
            <ProgressLabel>{label}</ProgressLabel>
            <ProgressBar value={value} variant="determinate" />
        </Box>
    )
}

const MonsterBattleCard: React.FC<MonsterCardProps> = ({ title, monster }) => {
    if (!monster) {
        return (
            <BattleMonsterCard centralized>
                <BattleMonsterTitle>{title!}</BattleMonsterTitle>
            </BattleMonsterCard>
        )
    }

    return (
        <BattleMonsterCard>
            <Image src={monster.imageUrl} />
            <MonsterName>{monster.name}</MonsterName>

            <SectionDivider />

            <PropertyItem value={monster.hp} label="HP" />
            <PropertyItem value={monster.attack} label="Attack" />
            <PropertyItem value={monster.defense} label="Defense" />
            <PropertyItem value={monster.speed} label="Speed" />
        </BattleMonsterCard>
    )
}

export { MonsterBattleCard }