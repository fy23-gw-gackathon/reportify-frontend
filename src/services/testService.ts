import { TestEntity } from "@/entites/test-entity";
import { WebClient } from "@/utils/webclient";

export const execTestAPI = async () => {
    const request = new WebClient<TestEntity[]>("http://localhost:3000/test", "GET");
    return await request.exec();
};
