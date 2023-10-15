import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAppDispatch } from "../../app/hooks"
import { MonsterBattleCard } from "../../components/monster-battle-card/MonsterBattleCard"
import { MonstersList } from "../../components/monsters-list/MonstersList"
import { Title } from "../../components/title/Title"
import { fetchMonstersData } from "../../reducers/monsters/monsters.actions"
import { selectMonsters, selectSelectedMonster, selectComMonster } from "../../reducers/monsters/monsters.selectors"
import { BattleSection, PageContainer, StartBattleButton } from "./BattleOfMonsters.styled"
import { postBattleData } from "../../reducers/battle/battle.actions"
import { selectCurrentBattle } from "../../reducers/battle/battle.selectors"
import { WinnerDisplay } from "../../components/winner-display/WinnerDisplay"

const BattleOfMonsters = () => {
    const dispatch = useAppDispatch()

    const monsters = useSelector(selectMonsters)
    const selectedMonster = useSelector(selectSelectedMonster)
    const comMonster = useSelector(selectComMonster)

    const currentBattle = useSelector(selectCurrentBattle)

    useEffect(() => {
        dispatch(fetchMonstersData())
    }, [dispatch]);

    const handleStartBattleClick = () => {
        // Fight!
        if (!selectedMonster || !comMonster) {
            return;
        }
        dispatch(postBattleData([selectedMonster, comMonster]))
    }

    return (
        <PageContainer>
            <Title>Battle of Monsters</Title>

            <MonstersList monsters={monsters} />

            {currentBattle && <WinnerDisplay text={currentBattle?.winner.name} />}

            <BattleSection>
                <MonsterBattleCard title={selectedMonster?.name || "Player"} monster={selectedMonster}></MonsterBattleCard>
                <StartBattleButton data-testid="start-battle-button"  disabled={selectedMonster === null} onClick={handleStartBattleClick}>Start Battle</StartBattleButton>
                <MonsterBattleCard title={comMonster?.name || "Computer"} monster={comMonster}></MonsterBattleCard>
            </BattleSection>
        </PageContainer>
    )
}

export { BattleOfMonsters }