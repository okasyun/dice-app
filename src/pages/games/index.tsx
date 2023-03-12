import { NextPageWithLayout } from "@/interfaces/common";
import { Container } from "@mui/material";
import BoardGameBrowser from "@/components/boardgame/BoardGameBrowser";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";

/*———————————–
  ボドゲ一覧画面
———————————–*/
const Games: NextPageWithLayout = () => {
  return (
    <Container maxWidth="lg">
      <BoardGameBrowser allowBorrow />
    </Container>
  );
};

Games.getLayout = (page) => {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Games;
