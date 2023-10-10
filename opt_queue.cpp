//memory-efficient: used same vector data, no need in the helper vector
//faster: constant multipliers are smaller in for loop
#include <iostream>
#include <vector>

class Queue {
public:
    Queue() : data(BLOCK_SIZE), nextFree(0), nextFull(0), inUse(0) {}

    void enqueue(int value) {
        if (inUse == data.size()) {
            enlargeQueue();
        }
        data.at(nextFree) = value;
        nextFree = (nextFree + 1) % data.size();
        inUse++;
    }

    int dequeue() {
        if (isEmpty()) {
            throw std::runtime_error("Queue is empty");
        }
        int result = data.at(nextFull);
        nextFull = (nextFull + 1) % data.size();
        inUse--;
        return result;
    }

    bool isEmpty() const {
        return inUse == 0;
    }

private:
    const int BLOCK_SIZE = 10;
    std::vector<int> data;
    int nextFree, nextFull, inUse;

    void enlargeQueue() {
        int newSize = data.size() + BLOCK_SIZE;
        std::vector<int> newData(newSize);

        for (int i = 0; i < inUse; i++) {
            newData.at(i) = data.at(nextFull);
            nextFull = (nextFull + 1) % data.size();
        }

        data = newData;
        nextFull = 0;
        nextFree = inUse;
    }
};
