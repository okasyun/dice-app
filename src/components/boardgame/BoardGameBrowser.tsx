import { FC } from "react";
import { Grid } from "@mui/material";
import { BoardGame } from "@/interfaces/boardgame";
import { getBoardGame } from "@/api/games/functions";
import { useQuery } from "react-query";

import BoardGameCard from "@/components/boardgame/BoardGameCard";
import CommonError from "@/components/common/CommonError";
import CommonLoading from "@/components/common/CommonLoading";

type Props = {
  allowBorrow?: boolean;
};

/*———————————–
  ボドゲリスト本体
———————————–*/
const BoardGameBrowser: FC<Props> = ({ allowBorrow }) => {
  const { data, isError, isLoading } = useQuery("get-boardgame", getBoardGame);

  // ロード中,エラー時はそれに応じた表示
  if (isLoading)
    return <CommonLoading>ゲーム情報を読み込み中...</CommonLoading>;

  if (isError || !data)
    return (
      <CommonError>
        データの読み込み中にエラーが発生しました。権限が無いか、APIが使用回数上限に達している可能性があります。
      </CommonError>
    );

  return (
    <Grid container sx={{ mt: 3 }} spacing={1}>
      {data.map((game: BoardGame) => (
        <Grid item xs={6} sm={4} lg={3} key={game.code}>
          <BoardGameCard boardGame={game} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardGameBrowser;
